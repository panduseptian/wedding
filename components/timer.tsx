"use client";
import { useCountdown } from "@/hooks/useCountDown";

export default function Timer({ targetDate }: { targetDate: number }) {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <div className="text-lg font-bold">{days}</div>
          <div className="text-md font-mono">Hari</div>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <div className="text-lg font-bold">{hours}</div>
          <div className="text-md font-mono">Jam</div>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <div className="text-lg font-bold">{minutes}</div>
          <div className="text-md font-mono">Menit</div>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col items-center">
          <div className="text-lg font-bold">{seconds}</div>
          <div className="text-md font-mono">Detik</div>
        </div>
      </div>
    </>
  );
}
