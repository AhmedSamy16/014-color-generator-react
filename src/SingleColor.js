import { useState, useEffect } from "react"

const SingleColor = ({ rgb, weight, type, hex }) => {
  const [alert, setAlert] = useState(false)
  const handleCopy = () => {
    setAlert(true)
    navigator.clipboard.writeText(`#${hex}`)
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [alert])
  return (
    <article onClick={handleCopy} className={`color ${type === "shade" && 'color-light'}`} style={{ backgroundColor: `rgb(${rgb.join(",")})` }}>
      <p className="percent-value">{weight}%</p>
      <p className="color-value">#{hex}</p>
      {alert && <p className={`alert ${type === "shade" ? 'alert-light' : 'alert-dark'}`}>copied to clipboard</p>}
      <button className="btn btn-copy" onClick={handleCopy}>copy</button>
    </article>
  )
}

export default SingleColor