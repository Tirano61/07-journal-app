
import { shallowMount } from "@vue/test-utils";
import Fab from "../../../../../src/modules/daybook/components/Fab";


describe('Pruebas en el fab components', () => {
    
    test('Debe mostrar el icono por defecto ', () => {
        
        const wrapper = shallowMount( Fab )
        const iTag = wrapper.find('i')

        expect( iTag.classes('fa-plus')).toBeTruthy()

    })

    test('Debe mostrar el icono por argumento: fa-circle ', () => {
        
        const wrapper = shallowMount( Fab, { 
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')

        expect( iTag.classes('fa-circle')).toBeTruthy()

    })

    test('Debe emitir el evento on:click al hacer click', () => {
        const wrapper = shallowMount( Fab )

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:Click')).toHaveLength(1)
    })
    
    

})
