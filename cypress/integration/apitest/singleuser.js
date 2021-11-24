/// <reference types="Cypress" />

describe('testing single user record',()=>{
    it('single record',()=>{
        cy.request({
            methos : 'GET',
            url : 'https://gorest.co.in/public/v1/users/4'
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Lavanya Tandon')
        })
    })

})
