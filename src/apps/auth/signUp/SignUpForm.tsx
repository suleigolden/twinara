import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  Text,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { SignUpSchema } from './schema';
import { CountrySelect } from '../../../components/fields/CountrySelect';
import { SignUpRequest, User, AccountTypes } from '@suleigolden/the-last-spelling-bee-api-client';
import { registerUser } from '../../../redux-action/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-action/store';
import { useLogInNavigation } from '../../../hooks/use-login-navigation';
import { CustomToast } from '../../../hooks/CustomToast';
import { TermsCheckbox } from '../../../components/fields/TermsCheckbox';

const accountTypeLabels: Record<typeof AccountTypes[number], string> = {
  'individual': 'Individual',
  'organization': 'Organization',
  'organization-user': 'Organization User',
  'udemy-user': 'Udemy User',
  'dementia-user': 'Dementia User',
  'caregiver-user': 'Caregiver User',
};

export const SignUpForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isEmailExists, setIsEmailExists] = useState<string>('');
  const handleClick = () => setShow(!show);
  const { navigateToDashboard } = useLogInNavigation('signup');
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    mode: 'onChange',
    defaultValues: {
      accountType: 'individual',
    },
  });
  const showToast = CustomToast();

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const payload: SignUpRequest = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        country: data.country,
        accountType: data.accountType as typeof AccountTypes[number],
      };
      const res = await dispatch(registerUser(payload));

      if (res.meta.requestStatus === 'fulfilled') {
        await navigateToDashboard(res.payload as User);
      } else {
        const errorMessage = res.payload as string;
        showToast('Sign Up', errorMessage, 'error');
        if (
          typeof errorMessage === 'string' &&
          errorMessage.includes('Email')
        ) {
          setIsEmailExists(errorMessage);
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      showToast('Sign Up', error.message, 'error');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.accountType}>
          <FormLabel>Account Type</FormLabel>
          <Controller
            name="accountType"
            control={control}
            rules={{ required: 'Account type is required' }}
            render={({ field }) => (
              <Select {...field} placeholder="Select account type">
                  <option  value="dementia-user">
                    {accountTypeLabels["dementia-user"]}
                  </option>
                  <option  value="caregiver-user">
                    {accountTypeLabels["caregiver-user"]}
                  </option>
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors.accountType && errors.accountType.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.first_name}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            {...register('first_name', {
              required: 'First name is required',
            })}
            placeholder="Enter your first name"
          />
          <FormErrorMessage>
            {errors.first_name && errors.first_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.last_name}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            {...register('last_name', {
              required: 'Last name is required',
            })}
            placeholder="Enter your last name"
          />
          <FormErrorMessage>
            {errors.last_name && errors.last_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Enter your email"
            onKeyUp={() => setIsEmailExists('')}
          />
          <Text
            as={'span'}
            color="red.500"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            {errors.email && errors.email.message}
            {isEmailExists && isEmailExists}
          </Text>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              placeholder="Enter your password"
            />
            <InputRightElement>
              <Icon
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                color="gray.400"
                cursor="pointer"
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        {/* <CountrySelect
          control={control}
          name="country"
          error={errors.country?.message}
          isRequired
        /> */}

        <TermsCheckbox 
          register={register} 
          error={errors.acceptTerms?.message}
        />

        <Button
          type="submit"
          colorScheme="brand"
          size="lg"
          fontSize="md"
          isLoading={isSubmitting}
          w="100%"
          mt={4}
        >
          Create Account
        </Button>
      </Stack>
    </Box>
  );
};

