import Header from "./Header"
import PetPage from "./PetPage"
import {useState, useEffect} from "react"

function App() {

  const [searchText, setSearchText] = useState("")
  const [formData, setFormData] = useState({})

  const [pets, setPets] = useState([])

  useEffect (() => {
    fetch('http://localhost:4000/pets')
      .then(response => response.json())
      .then(petData => setPets(petData))
}, [])
  const filteredPets = pets.filter(pet => {
    if(searchText === ""){
      return true
    }
    return pet.name.toUpperCase().includes(searchText.toUpperCase())
  })

  function adoptPet(id){
    fetch(`http://localhost:4000/pets/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        setPets(pets.filter(pet => {
      return pet.id !== id
    }))
      }
    })
    
  }

  function addPet(event){
    event.preventDefault()
    console.log(formData)

    fetch('http://localhost:4000/pets', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newPet => setPets([...pets, newPet]))
  }

  function updateFormData(event){
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  return (
    <div className="app">
      <Header />
      <PetPage pets={filteredPets} setSearchText={setSearchText} adoptPet={adoptPet} addPet={addPet} updateFormData={updateFormData} />
    </div>
  );
}

export default App;