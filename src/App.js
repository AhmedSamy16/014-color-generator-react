import { useEffect, useState } from "react"
import SingleColor from "./SingleColor";
import Values from "values.js";

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const colors = new Values(color).all(10)
      setList(colors)
      setError(false)
    } catch (err) {
      setError(true)
    }
  }
  const randomColor = () => {
    const vals = ['a', 'b', 'c', 'd', 'e', 'f', '0','1', '2', '3', '4', '5', '6', '7', '8', '9']
    let c = '#'
    for (let i = 0; i < 6; i++) {
      let randIndex = Math.floor(Math.random() * vals.length)
      c += vals[randIndex]
    }
    setList(new Values(c).all(10))
  }

  useEffect(() => {
    randomColor()
  }, [])
  return (
    <>
    <section className="container">
      <h3>color generator</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={color}
          className={`${error && 'error'}`}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g. #f15025" />
        <button type="submit" className="btn">submit</button>
      </form>
    </section>
    <button type="button" 
      className="btn" 
      style={{ display: 'block', margin: '0 auto 1rem' }}
      onClick={randomColor}
      >
        random
      </button>
    <section className="colors">
      {
        list.map((color, index) => {
          return <SingleColor key={index} {...color} hex={color.hex} />
        })
      }
    </section>
    </>
  );
}

export default App;
