///<reference types="Cypress" />

describe('put user data',()=>{
    let accessToken='a8653f55747e213697f3aed3a4ede31c1a0fd2016061731be452b2ea85dea64b'
    let randomText=''
    let randomEmail=''

    it('create user',()=>{
        var pattern='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        randomText=pattern.charAt(Math.floor(Math.random*pattern.length))
        randomEmail=randomText+'@gmail.com'
        
        cy.request({

            method: 'POST',
            url:'https://gorest.co.in/public/v1/users/',
            headers:{
                'Authorization':'Bearer '+accessToken
            },
            body:{

                "name":'abhilashTest',
                "gender":'male',
                "email":'abhilashTest@gmail.com',
                "status":'active'

            }

        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('name','abhilashTest')
            expect(res.body.data).has.property('email','abhilashTest@gmail.com')

        
    }).then((res)=>{

        const userId=res.body.data.id

        cy.request({

            method:'PUT',
            url:'https://gorest.co.in/public/v1/users/'+userId,
            headers:{
                'Authorization':'Bearer '+accessToken
            },
            body:{
                "name":'abhilashTest automation',
                "gender":'male',
                "email":'abhilashTestAutomation@gmail.com',
                "status":'inactive'
            }


        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data).has.property('name','abhilashTest automation')
            expect(res.body.data).has.property('email','abhilashTestAutomation@gmail.com')
            expect(res.body.data).has.property('status','inactive')
        })

    })


    })






})