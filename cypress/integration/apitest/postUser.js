/// <reference types="Cypress" />
//import { name, gender, status } from '../../fixtures/createUsers.json'

describe('post user api',()=>{
    let accessToken='a8653f55747e213697f3aed3a4ede31c1a0fd2016061731be452b2ea85dea64b'
    let randomText=""
    let randomEmail=""
    it('post user data',()=>{
        var pattern="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(var i=0;i<10;i++)
        randomText+=pattern.charAt(Math.floor(Math.random()*pattern.length))
        randomEmail=randomText+'@gmail.com'

        cy.fixture('createUsers').then((payload)=>{
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v1/users/',
            headers : {
                'Authorization':'Bearer '+ accessToken
            },
            body : {
                
                    "name":payload.name,
                    "gender":payload.gender,
                    "email":randomEmail,
                    "status":payload.status
                    
            }

        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)     
            expect(res.body.data).has.property('email',randomEmail)
            expect(res.body.data).has.property('gender',payload.gender)
            expect(res.body.data).has.property('name',payload.name)
        }).then((res)=>{
            const userId=res.body.data.id
            cy.log('user id is: '+userId)

            cy.request({
                method: 'GET',
                url : 'https://gorest.co.in/public/v1/users/'+userId,

                headers:{
                    Authorization:'Bearer '+ accessToken

                }

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('email',randomEmail)
                expect(res.body.data).has.property('id',userId)
                expect(res.body.data).has.property('gender',payload.gender)
                expect(res.body.data).has.property('name',payload.name)


            })
        })
    })
    })
})