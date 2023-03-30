import { enableButtons } from "../main.js";
import authApp from "./lib/barrel.js";
import { toggleSignIn } from "../lib/barrel.js";

export const viewSignIn = (Router) => {
  const sectionSignIn = document.createElement("section");
  sectionSignIn.className = "background-radial-gradient overflow-hidden";
  sectionSignIn.setAttribute("id", "signInView");

  sectionSignIn.innerHTML = `
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
            La mejor App <br />
            <span style="color: hsl(218, 81%, 75%)">para disfrutar con otros.</span>
          </h1>
          <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Temporibus, expedita iusto veniam atque, magni tempora mollitia
            dolorum consequatur nulla, neque debitis eos reprehenderit quasi
            ab ipsum nisi dolorem modi. Quos?
          </p>
        </div>
  
        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>
  
          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form id="formSignIn"> 
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" id="email" class="form-control" />
                  <label class="form-label" for="email">Correo Electrónico</label>
                </div>
  
                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" id="password" class="form-control" />
                  <label class="form-label" for="password">Contraseña</label> <br>
                  <input type="checkbox" id="showPassword" name="showPassword">
                  <label for="showPassword">Mostrar contraseña</label>
                </div>
  
                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                  <label class="form-check-label" for="form2Example33"></label>
                    Recuerdame
                  </label>
                </div>

                <!-- Simple link -->
                <button type="button" class="btn btn-link btn-floating mx-1" id="password-reset">¿Olvidaste tu constraseña?</button> 
                
                <!-- Register buttons -->
                <div class="text-center">
                <p>¿No estás registrado? <a href="#!">Registrate</a></p>
  
                <!-- Submit button -->
                <button id="sign-in" class="btn btn-primary btn-block mb-4" disabled>
                  Ingresar
                </button>
  
                <!-- Register buttons -->
                <div class="text-center">
                  <p>o ingresa con:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>
  
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>
  
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>
  
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const data = new Promise((resolve, reject) => {
    document.getElementById("formSignIn").addEventListener("input", () => {
      const userData = enableButtons("sign-in");
      resolve(userData);
    }, { once: true });
  });


  //Using array destructuring
  const [email, password] = data;
  console.log("email lista: " + email);
  console.log("contraseña lista: " + password);

  sectionSignIn.querySelector("#sign-in").addEventListener("click", toggleSignIn);

  if (toggleSignIn(authApp, email, password)) {
    Router.loadBody("feed");
  }

  return sectionSignIn;

};
