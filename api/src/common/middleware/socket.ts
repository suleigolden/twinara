import { Server } from 'socket.io';

type PlayerScore = {
  name: string;
  score: number;
  gameId: string | number;
};

const playersScores: { [key: string]: PlayerScore } = {};

/**
 * Initialize Socket.IO server
 * @param {object} server - The HTTP server to attach Socket.IO to.
 */
type PlayerData = {
  name: string;
  gameId: string | number;
  score: number;
};

type ScoreUpdate = {
  playerId: string;
  score: number;
};

export const initPlayersCollaborationSocket = (server: any): Server => {
  const io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins for development; configure this in production
      methods: ['GET', 'POST'],
    },
  });
  console.log('waiting for connection...');
  io.on('connection', (socket) => {
    const { socketId, gameId } = socket.handshake.query;

    console.log('A user connected:', { socketId, gameId });

    if (socketId && io.sockets.sockets.get(socketId as string)) {
      const existingSocket = io.sockets.sockets.get(socketId as string);
      if (existingSocket) {
        socket = existingSocket;
      }
    }

    // Handle player joining the memory game
    socket.on('joinGame', (playerData: PlayerData) => {
      playersScores[socket.id] = {
        name: playerData.name,
        gameId: playerData.gameId,
        score: playerData.score ?? 0,
      };

      console.log(`User ${playerData.name} joined game ${playerData.gameId}`);

      // Emit only scores for the same gameId
      const gameScores = Object.fromEntries(
        Object.entries(playersScores).filter(
          ([_, player]) => player.gameId === playerData.gameId,
        ),
      );
      io.to(socket.id).emit('updateScores', gameScores);
    });

    // Handle score updates
    socket.on('updateScore', ({ playerId, score }: ScoreUpdate) => {
      if (playersScores[playerId]) {
        playersScores[playerId].score = score;
        const gameId = playersScores[playerId].gameId;

        // Emit only scores for the same gameId
        const gameScores = Object.fromEntries(
          Object.entries(playersScores).filter(
            ([_, player]) => player.gameId === gameId,
          ),
        );
        io.emit('updateScores', gameScores);
      }
    });

    // Handle player disconnect
    socket.on('disconnect', () => {
      const gameId = playersScores[socket.id]?.gameId;
      delete playersScores[socket.id];

      // Emit updated scores for the same gameId
      if (gameId) {
        const gameScores = Object.fromEntries(
          Object.entries(playersScores).filter(
            ([_, player]) => player.gameId === gameId,
          ),
        );
        io.emit('updateScores', gameScores);
      }

      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
};
