import React from "react"
import { Tooltip } from "react-tooltip"

function Verified({ isGold = false, isOfComStats = false }: { isGold?: boolean, isOfComStats?: boolean}) {
  return (
    <div
      data-tooltip-id="verified-tooltip"
      data-tooltip-content={`${
        isGold ? `${isOfComStats ? "Comstats": "Golden"} Bagde` : "Verified Badge"
      }`}
      data-tooltip-place="top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-5 h-5 ${
          isGold ? "text-[#DAA520]" : "text-blue-500"
        } cursor-pointer`}
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
      <Tooltip
        id="verified-tooltip"
        className="z-[999]"
        data-tooltip-id={Math.random().toString(36).substr(2, 5)}
      />
    </div>
  )
}

export default Verified
