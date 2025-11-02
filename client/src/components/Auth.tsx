import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Auth() {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Sign in to access your SEO Dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleLogin} className="w-full">
          Sign in
        </Button>
      </CardContent>
    </Card>
  )
}
