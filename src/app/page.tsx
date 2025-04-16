import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
			<h1 className="text-4xl font-bold mb-4">
				Learn Languages with AI Dialogues
			</h1>
			<p className="text-xl mb-8 max-w-2xl">
				Practice conversations in multiple languages with AI-generated dialogues
				tailored to your interests, level, and learning style.
			</p>

			<div className="flex gap-4">
				<Link href="/dashboard">
					<Button size="lg">Get Started</Button>
				</Link>
				<Link href="/auth/sign-in">
					<Button variant="outline" size="lg">
						Sign In
					</Button>
				</Link>
			</div>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
				<FeatureCard
					title="Realistic Dialogues"
					description="Practice with AI-generated conversations on any topic, tailored to your level"
					icon="💬"
				/>
				<FeatureCard
					title="Multiple Practice Modes"
					description="Roleplay conversations or practice with listen and repeat exercises"
					icon="🎭"
				/>
				<FeatureCard
					title="Track Your Progress"
					description="Save favorite dialogues and monitor your language learning journey"
					icon="📊"
				/>
			</div>
		</main>
	);
}

function FeatureCard({
	title,
	description,
	icon,
}: { title: string; description: string; icon: string }) {
	return (
		<div className="border rounded-lg p-6 text-center">
			<div className="text-4xl mb-4">{icon}</div>
			<h2 className="text-xl font-semibold mb-2">{title}</h2>
			<p>{description}</p>
		</div>
	);
}
