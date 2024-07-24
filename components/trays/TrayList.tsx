"use client"
import { useAppContext } from "@/app/context/AppContext"

const TrayList = () => {
    const { trays } = useAppContext();
  return (
    <div>
      <h2>Trays:</h2>
      <ul>
        {trays.map((tray) => (
          <li key={tray._id}>
            {tray.name} - {tray.message} - {tray.selectedTray}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrayList