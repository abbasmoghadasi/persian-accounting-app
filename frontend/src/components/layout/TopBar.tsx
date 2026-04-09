import './TopBar.css'

interface TopBarProps {
  title: string
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>
    </header>
  )
}
