import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@/components/signin-button";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-100 pb-2">Login</CardTitle>
        <CardDescription className="text-slate-300">
          Click the button below to authenticate using your GitHub account!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SignIn />
        </div>
      </CardContent>
    </Card>
  );
}
