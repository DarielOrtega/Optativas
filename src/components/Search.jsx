'use client'
import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";

export default function Search({ register, setValue, ...props }) {
    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false
    });

    const handleSelect = (item) => {
        setValue("subjectName", item.label);
        setAutocompleteState(prevState => ({ ...prevState, isOpen: false }));
    };

    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: 'Buscar',
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

    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current
    });

    return (
        <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
                {...register("subjectName", {
                    required: {
                        value: true,
                        message: "El nombre de la asignatura es requerido"
                    }
                })}
                {...inputProps}
                type="text"
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
