
// Function to get Spells List
export async function spellList(){
    const response = await fetch(`https://www.dnd5eapi.co/api/spells`, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
  }


  // Function to get Spell By Index
export async function spellByIndex(data){
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/`+data, {
        method: 'get',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
  }