describe('application work', () => {
    it('something', () => {
        cy
            .visit('/')
            .get('input')
            .type('1', )
            .type('2', )
            .type('3', )
            .type('4', )
            .type('5', )
            .type('6', )
            .type('7', )
            .type('8', )
            .type('9', )
            .should('have.value', '123 456 789')
    })
})