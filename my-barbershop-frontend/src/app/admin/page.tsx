interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Admin({ children }: RootLayoutProps) {
  return <>{children}</>;
}
