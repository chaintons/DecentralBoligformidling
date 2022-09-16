export default function SelectProperty() {
    async function selectPropertyOnWeb2() {
        const res = await fetch('api/mocks/select-property')
        const json = await res.json()
        console.log(JSON.stringify(json.owner))
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <button onClick={selectPropertyOnWeb2} className="font-bold mt-4 bg-teal-400 text-white rounded p-4 shadow-lg">
                        Select Property
                    </button>
                </div>
            </div>
        </>
    )
}