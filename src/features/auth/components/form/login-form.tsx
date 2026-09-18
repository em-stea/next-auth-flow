"use client";

import { HStack, Link, Separator, Text, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SocialButton } from "@/shared/components/social-button/social.button";
import { toaster } from "@/shared/components/toaster/toaster";

import { SOCIAL_ICONS_DATA } from "../../data/social-icons.data";
import { doLogin } from "../../service/login-action";
import { loginFormSchema } from "../../squemas/login-form.squema";
import { PasskeyButton } from "../passkey-button";
import { Form } from "./form";
import { InputField } from "./input.form";
import { InputPasswordField } from "./input.password.form";
import { SubmitForm } from "./submit.form";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <Form
      type="nextForm"
      form={form}
      action={doLogin}
      onSuccess={() => {
        router.push("/");
      }}
      onError={(error) => {
        toaster.error({ description: error, closable: true });
      }}
    >
      <VStack gap="4" mb="9">
        <InputField name="email" placeholder="Enter email" label="Email" />
        <InputPasswordField name="password" placeholder="Enter password" label="Password" />
        <Link alignSelf="flex-end" asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/forgot-password">Forgot your password?</NextLink>
        </Link>
      </VStack>

      <SubmitForm w="full">Log in</SubmitForm>

      <HStack justifyContent="center" my="6">
        <Separator color="gray.500" w="full" />
        <Text textStyle="button.3" color="gray.500" whiteSpace="nowrap">
          or continue with
        </Text>
        <Separator color="gray.500" w="full" />
      </HStack>

      <VStack gap="3">
        <PasskeyButton />
        {SOCIAL_ICONS_DATA.map((social) => (
          <SocialButton
            key={social.type}
            icon={social.icon}
            color={social.color}
            name={social.name}
            provider={social.provider}
          />
        ))}
      </VStack>

      <HStack justifyContent="center" mt="6" gap="1">
        <Text textStyle="body.2" color="gray.500">
          Don&apos;t have an account?
        </Text>
        <Link asChild color="blue.500" textStyle="body.2.semibold">
          <NextLink href="/auth/signup">Sign up</NextLink>
        </Link>
      </HStack>
    </Form>
  );
};
