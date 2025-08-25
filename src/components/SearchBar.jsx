import React from "react"

function SearchBar({ onSearch, placeholder = "Rechercher..." }) {
    const [query, setQuery] = React.useState("")

    const handleChange = (e) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none text-lg transition-all duration-300 focus:shadow-lg"
            />
            <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
        </div>
    )
}

export default SearchBar