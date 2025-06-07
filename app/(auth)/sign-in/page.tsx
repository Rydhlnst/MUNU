import { LoginForm } from "@/components/login-form";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <LoginForm className="w-full max-w-md" />
        </div>
    );
}