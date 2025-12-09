import {
  Badge,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaBed, FaBath, FaUsers } from "react-icons/fa";
import { formatCurrency } from "~/common/utils/helperFuntions";
import { useListings } from "~/hooks/use-listings";
import { useNavigate } from "react-router-dom";

export const PublicListings = () => {
  const { listings, isLoading } = useListings();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Flex>
    );
  }
 
  return (
    <Container maxW="1500px" px={[4, 8]} py={8}>
      <VStack align="start" spacing={8} w="full" mt={10}>
        {/* Header -  Search Bar*/}

        {/* Properties Grid */}
        {listings?.length === 0 ? (
          <Card w="full" variant="outline"></Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
            {listings?.map((listing) => (
              <Card
                key={listing.id}
                overflow="hidden"
                variant="outline"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "md",
                  borderColor: "brand.500",
                  cursor: "pointer",
                }}
                transition="all 0.2s"
                onClick={() => {
                  navigate(`/details/listing/${listing.id}`);
                }}
              >
                {/* Property Image */}
                <Image
                  src={listing.photo_galleries?.[0]?.url || "/placeholder.jpg"}
                  alt={listing.title}
                  height="200px"
                  objectFit="cover"
                />

                <CardBody>
                  <VStack align="start" spacing={3}>
                    {/* Title and Price */}
                    <Flex justify="space-between" w="full">
                      <Badge
                        colorScheme={
                          listing.listing_type === "rent" ? "green" : "purple"
                        }
                      >
                        {listing.listing_type === "rent"
                          ? "For Rent"
                          : "For Sale"}
                      </Badge>
                      <Text fontWeight="bold" color="brand.500">
                        {formatCurrency(
                          listing.monthly_rent_or_sell_amount?.amount || 0,
                          listing.monthly_rent_or_sell_amount?.currency ||
                            "CAD",
                        )}
                      </Text>
                    </Flex>

                    {/* Property Title */}
                    <Heading size="md" noOfLines={1}>
                      {listing.title}
                    </Heading>

                    {/* Location */}
                    <Flex align="center" gap={2} color="gray.600">
                      <Icon as={FaMapMarkerAlt} />
                      <Text fontSize="sm" noOfLines={1}>
                        {listing.address?.street}, {listing.address?.city}
                      </Text>
                    </Flex>

                    {/* Property Details */}
                    <HStack spacing={4} color="gray.600">
                      <Flex align="center" gap={1}>
                        <Icon as={FaBed} />
                        <Text fontSize="sm">{listing.number_of_bedrooms}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Icon as={FaBath} />
                        <Text fontSize="sm">{listing.number_of_bathrooms}</Text>
                      </Flex>
                      <Flex align="center" gap={1}>
                        <Icon as={FaUsers} />
                        <Text fontSize="sm">
                          {listing.listing_requests?.length || 0}/
                          {listing.num_of_tenants_or_owners_needed}
                        </Text>
                      </Flex>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};
