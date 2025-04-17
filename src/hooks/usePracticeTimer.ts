import { useState, useEffect, useRef } from "react";

export function usePracticeTimer(isActive = true) {
	const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		if (isActive) {
			startTimeRef.current = Date.now();

			timerRef.current = setInterval(() => {
				if (startTimeRef.current) {
					const secondsElapsed = Math.floor(
						(Date.now() - startTimeRef.current) / 1000,
					);
					setElapsedSeconds(secondsElapsed);
				}
			}, 1000);
		} else {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isActive]);

	// Format time as mm:ss
	const formattedTime = () => {
		const minutes = Math.floor(elapsedSeconds / 60);
		const seconds = elapsedSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	// Save practice time to the backend
	const savePracticeTime = async (language: string) => {
		try {
			const response = await fetch("/api/stats", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					practiceTime: elapsedSeconds,
					language,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save practice time");
			}

			// Reset timer after successful save
			setElapsedSeconds(0);
			if (startTimeRef.current) {
				startTimeRef.current = Date.now();
			}

			return true;
		} catch (error) {
			console.error("Error saving practice time:", error);
			return false;
		}
	};

	return {
		elapsedSeconds,
		formattedTime,
		savePracticeTime,
	};
}
