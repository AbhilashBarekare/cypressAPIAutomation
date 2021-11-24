/// <reference types ="Cypress" />



describe('get api users test', ()=>{
    it('get users',()=>{
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v1/users',
            // headers : {
            //     'authorization' :  "Bearer a8653f55747e213697f3aed3a4ede31c1a0fd2016061731be452b2ea85dea64b"
            // }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

})

