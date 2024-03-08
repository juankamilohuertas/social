const fragment = document.createDocumentFragment();
const root = document.querySelector(".root");
const btnCrearPublicacion = document.getElementById("btnCrearPublicacion");

const abrirModal = (abrir) => {
  let modal = "";
  if (abrir) {
    modal = `
    <div class="position-relative shadow-lg p-2 m-1 bg-dark rounded">
      <p id="cerrarModal" class="position-absolute end-0 top-0">✖</p>
      <div class="container p-0">
        <p class="fs-3 mb-2 text-light">Creando Publicación</p>
        <input
          id="titulo"
          class="col-12 rounded-2 border border-2 focus-ring focus-ring-primary"
          placeholder="Titulo"
          type="text"
        />
        <textarea
          id="descripcion"
          class="col-12 rounded-2 border border-2 focus-ring focus-ring-primary my-2"
          maxlength="140"
          placeholder="Descripcion"
          style="resize: none"
        ></textarea>
        <input id="archivo" class="col-12 text-light" type="file" />
        <button id="btnPublicar" class="btn btn-primary mt-3 w-100">Publicar</button>
      </div>
    </div> `;
  }
  return modal;
};

/* Abrir modal y crear publicacion */
btnCrearPublicacion.addEventListener("click", () => {
  document.getElementById("conteModalPublicacion").innerHTML = abrirModal(true);
  cerrarModal(document.getElementById("cerrarModal"));
  /* enviando data */
  const titulo = document.getElementById("titulo");
  const descripcion = document.getElementById("descripcion");
  const archivo = document.getElementById("archivo");
  const btnPublicar = document.getElementById("btnPublicar");
  /* cargando imagen */
  archivo.addEventListener("change", (e) => {
    infoPublicacion(e.target.files[0]);
  });
  /* publicacion creada */
  btnPublicar.addEventListener("click", () => {
    validacionPublicacion(titulo.value, descripcion.value, dataImg);
  });
});
/* imagen cargada */
const infoPublicacion = (imagen) => {
  const reader = new FileReader();
  reader.readAsDataURL(imagen);
  reader.addEventListener("load", (e) => {
    dataImg = e.target.result;
  });
};
let dataImg;

/* validacion campos de publicacion y mostrando en el dom*/
const validacionPublicacion = (titulo, descripcion, archivo) => {
  const domPubicacion = `
  <div class="card" style="width: 18rem;">
  ${
    archivo == undefined
      ? `<i class="fa-solid fa-ellipsis-vertical p-3 pb-0"></i>`
      : ` <img src=${archivo} class="card-img-top" alt="...">`
  }
  <div class="card-body">
    <h5 class="card-title">${titulo}</h5>
    <p class="card-text">${descripcion}</p>
    <a href="#"><i class="fa-brands fa-gratipay"></i></a>
    <a href="#"><i class="fa-regular fa-comments"></i></a>
  </div>
</div>
    `;
  if (titulo != "" && descripcion != "") {
    document.querySelector(".contePublicaciones").innerHTML += domPubicacion;
    document.getElementById("conteModalPublicacion").innerHTML =
      abrirModal(false);
  } else {
    alert("Llena todos los campos");
  }
};
/* cerrar modal */
const cerrarModal = (cerrar) => {
  cerrar.addEventListener("click", () => {
    document.getElementById("conteModalPublicacion").innerHTML =
      abrirModal(false);
  });
};
