import { useState } from 'react'

export default function SelectProperty() {
    const [propertyOwner, setPropertyOwner] = useState('')
    const [formInput, updateFormInput] = useState({ address: '' })

    async function selectPropertyOnWeb2() {
        const res = await fetch(`api/mocks/select-property/${formInput.address}`)
        const json = await res.json()
        setPropertyOwner(json.owner)
        console.log(JSON.stringify(json.owner))
    }

    return (
        <>
            <div className="card p-4">
                <input 
                    placeholder="Address"
                    className="mt-8 border rounded p-4"
                    onChange={e => updateFormInput({ ...formInput, address: e.target.value })}
                />
                <button 
                    onClick={selectPropertyOnWeb2} 
                    className="font-bold mt-4, ml-4 bg-teal-400 text-white rounded p-4 shadow-lg"
                    disabled={!formInput.address}>
                    Select Property
                </button>
                <div className="pt-4">{propertyOwner}</div>
            </div>
        </>
    )
}