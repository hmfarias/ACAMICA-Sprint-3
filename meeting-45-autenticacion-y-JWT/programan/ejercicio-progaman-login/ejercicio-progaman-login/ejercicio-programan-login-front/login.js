document.addEventListener("DOMContentLoaded", () => {
  // poner todo el codigo

  document.querySelector("#enviar").addEventListener('click',
  async (ev) => {
   ev.preventDefault();

   const username = document.querySelector("#username").value;
   const password = document.querySelector("#password").value;
   const formData = new URLSearchParams();
   formData.append('username', username);
   formData.append('password', password);

   try {
     const response = await fetch("http://localhost:3000/login", {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
       },
       body: formData.toString(),
     });
     const responseJson = await response.json();
     if (response.status != 200) {
        alert(`error ${responseJson.error}`);
     }else {
        localStorage.setItem('user',JSON.stringify(responseJson));
        window.location.href = "saludo.html";
     }


   } catch (error) {
     alert(`error ${error.message}`);
   }
 } )
  
});
