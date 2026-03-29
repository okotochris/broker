export default function LoadingBar() {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden relative rounded">
      <div className="absolute h-full w-1/3 bg-blue-500 animate-slide"></div>

      <style jsx>{`
        @keyframes slide {
          0% {
            left: -30%;
          }
          50% {
            left: 50%;
            width: 40%;
          }
          100% {
            left: 100%;
          }
        }

        .animate-slide {
          animation: slide 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}