import { usePracticeTimer } from "@/hooks/usePracticeTimer";
import { Clock } from "lucide-react";
import { useEffect } from "react";

interface PracticeTimerProps {
	isActive?: boolean;
	language: string;
	onSave?: () => void;
}

export default function PracticeTimer({
	isActive = true,
	language,
	onSave,
}: PracticeTimerProps) {
	const { formattedTime, savePracticeTime } = usePracticeTimer(isActive);

	// Auto-save practice time every 5 minutes
	useEffect(() => {
		if (!isActive) return;

		const autoSaveInterval = setInterval(
			async () => {
				await savePracticeTime(language);
				if (onSave) onSave();
			},
			5 * 60 * 1000,
		); // 5 minutes

		return () => {
			clearInterval(autoSaveInterval);
			// Save time when component unmounts
			savePracticeTime(language);
			if (onSave) onSave();
		};
	}, [isActive, language, onSave]);

	return (
		<div className="flex items-center text-sm text-gray-600">
			<Clock className="h-4 w-4 mr-1" />
			<span>{formattedTime()}</span>
		</div>
	);
}
