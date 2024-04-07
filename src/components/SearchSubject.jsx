'use client'
import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";

export default function SearchSubject({ onSelect, ...props }) {
    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false
    });
    const [selectedSubject, setSelectedSubject] = useState(''); // Nuevo estado para la asignatura seleccionada

    const handleSelect = (item) => {
        onSelect(item.id); // Notifica al componente padre del cambio
        setSelectedSubject(item.nombre); // Guarda el nombre de la asignatura seleccionada
        setAutocompleteState(prevState => ({ ...prevState, isOpen: false }));
    };


    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: 'Buscar asignatura...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [{
            sourceId: props.sourceId,
            getItems: ({ query }) => {
                if (!!query) {
                    return fetch(`${props.apiUrl}?q=${query}`)
                        .then(res => res.json())
                        .then(data => {
                            return data.map(item => ({
                                ...item,
                                label: item.nombre
                            }));
                        });
                }
            }
        }],
        ...props
    }), [props]);

    const inputRef = useRef(null);
    const panelRef = useRef(null);
    const [inputValue, setInputValue] = useState(''); // Nuevo estado para el valor del input

    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current,
        id: props.id,
        value: inputValue,
        onChange: (event) => { setInputValue(event.target.value) }
    });

    return (
        <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
                {...inputProps}
                type="text"
                value={selectedSubject} // Establece el valor del input al nombre de la asignatura seleccionada
                readOnly
            />
            {autocompleteState.isOpen && (
                <div className="absolute left-0 mt-10 w-full max-w-md bg-gray-400 text-black rounded-lg shadow-lg"
                    ref={panelRef} {...autocomplete.getPanelProps()}>
                    {autocompleteState.collections.map((collection, index) => {
                        const { items } = collection;
                        return (
                            <section key={`section-${index}`}>
                                {items.length > 0 && (
                                    <ul {...autocomplete.getListProps()}>
                                        {items.map(item => (
                                            <li key={item.id} onClick={() => handleSelect(item)}>
                                                {item.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}