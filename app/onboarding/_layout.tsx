import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="email-verification" />
      <Stack.Screen name="role-selection" />
      <Stack.Screen name="professional-setup" />
    </Stack>
  );
}