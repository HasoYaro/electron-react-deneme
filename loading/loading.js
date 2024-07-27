document.addEventListener("DOMContentLoaded", async () => {
   await window.Api.updateStater(updateState)
   //updateState(await window.Api.updateStater())
})

function updateState(event, state){
    let uS = document.getElementById('updateState')
    console.log(state)
    uS.innerHTML = state;
}

async function loading(){

    // await window.Api.openDb()
    // await window.Api.getAllData('words')
    // await window.Api.getAllData('quizResults')
    // await window.Api.getSpecificData('words', 0)


    //await window.Api.insertData('words', {name: "Ozkan", age: 20}) // Electronmon kullanirken surekli yenilendigi icin surekli isliyor
    //await window.Api.deleteData('words', 0)                        // Electronmon kullanirken surekli yenilendigi icin surekli isliyor
    //await window.Api.updateData('words', 1, {name: "Fahri"})       // Electronmon kullanirken surekli yenilendigi icin surekli isliyor
    
    // setTimeout(() => {
    //     window.Api.loading(false)
    // }, 2500)
}

loading()
