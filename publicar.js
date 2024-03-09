const fragment = document.createDocumentFragment();
const btnCrearPublicacion = document.getElementById("btnCrearP");
const conteModalPublicacion = document.getElementById("conteModalP");
const contePublicaciones = document.getElementById("conteP");

class Publicacion {
  constructor(titulo, descripcion) {
    this.archivos = false;
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
  abrirModal(colorFondo) {
    let subConteModal = document.createElement("DIV");
    subConteModal.className =
      "position-relative shadow-lg p-2 m-1 bg-dark rounded";
    subConteModal.innerHTML = `
        <p id="cerrarModal" class="position-absolute end-0 top-0"><i class="text-secondary p-2 fs-5 fa-solid fa-xmark"></i></p>
        <div class="container p-0">
          <p class="fs-3 mb-2 text-light">Creando Publicación</p>
          <input
            id="titulo"
            class="col-12 rounded-2 border border-2 focus-ring focus-ring-success"
            maxlength="25"
            placeholder="Titulo"
            type="text"
          />
          <textarea
            id="descripcion"
            class="col-12 rounded-2 border border-2 focus-ring focus-ring-success my-2"
            maxlength="80"
            placeholder="Descripcion"
            style="resize: none"
          ></textarea>
          <div class="mb-3">
            <input id="archivos" type="file" class="form-control" aria-label="file example" required>
            <div class="invalid-feedback">Example invalid form file feedback</div>
          </div>
          <button id="btnPublicar" class="btn btn-success w-100">Publicar</button>
        </div>`;
    fragment.appendChild(subConteModal);
    conteModalPublicacion.appendChild(fragment);
    conteModalPublicacion.style.backgroundColor = colorFondo;
    conteModalPublicacion.style.height = "100vh";
  }
  cerrarModal() {
    const cerrarModal = document.getElementById("cerrarModal");
    cerrarModal.addEventListener("click", () => {
      conteModalPublicacion.innerHTML = "";
    });
  }
  fecha() {
    const tiempo = new Date();
    let diaMes = tiempo.getDate();
    let mes = tiempo.getMonth();
    const año = tiempo.getFullYear();
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const domFecha = `
     Publicado: <i>${diaMes}/${meses[mes]}/${año}</i> 
    `;
    return domFecha;
  }
  layendoArchivos() {
    archivos.addEventListener("change", () => {
      infoArchivos(archivos.files[0]);
    });
    const infoArchivos = (archivos) => {
      const leer = new FileReader();
      leer.readAsDataURL(archivos);
      leer.addEventListener(
        "load",
        (e) => (this.archivos = e.currentTarget.result)
      );
    };
  } /* tarjeta de publicacion */
  mostrandoInfo(fecha, archivos, titulo, descripcion) {
    const subContePublicaciones = document.createElement("DIV");
    subContePublicaciones.className = "card border border-1 m-2";
    subContePublicaciones.innerHTML = `
    <div class="card-body p-2">
      <div class="d-flex align-items-center justify-content-between mb-2 border border-1 rounded-2 p-1">
        <div class="pe-2">
          <img src="https://robohash.org/user" class="border-end rounded-start" width="40">
        </div>
        <div class="flex-grow-1">
          <h5 class="card-title m-0" style="font-size:.9rem fw-semibold">${titulo}</h5>
          <p class="card-text text-break" style="font-size:.7rem; line-height: .8rem">${descripcion}</p>
        </div>
        <div class="dropdown ps-2">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><a class="dropdown-item active" href="#">Borar</a></li>
            <li><a class="dropdown-item" href="#">Editar</a></li>
            <li><a class="dropdown-item" href="#">Crear Publicación</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Denunciar</a></li>
          </ul>
        </div>
      </div>
        ${
          archivos
            ? `<img src=${archivos} loading="lazy" class="card-img-top mb-2" alt="...">`
            : ""
        }
        <div>
          <a href="#" class=""><i class="fa-brands fa-gratipay"></i></a>
          <a href="#" class=""><i class="fa-regular fa-comments"></i></a>
          <a href="facebook.com" class=""><i class="fa-solid fa-square-share-nodes"></i></a>
        </div>
        <p class="m-0" style="font-size: .7rem">${fecha()}</p>
    </div>
      `;
    fragment.appendChild(subContePublicaciones);
    contePublicaciones.appendChild(fragment);
    conteModalPublicacion.innerHTML = "";
  }
  btnPublicar() {
    const btnPublicar = document.getElementById("btnPublicar");
    btnPublicar.addEventListener("click", () => {
      const publicacion = etradasPublicacion();
      if (
        publicacion.titulo.value != "" &&
        publicacion.descripcion.value != ""
      ) {
        this.mostrandoInfo(
          this.fecha,
          this.archivos,
          publicacion.titulo.value,
          publicacion.descripcion.value
        );
      } else {
        alert("Llena todos los campos");
      }
    });
  }
}
/* instanciacion de publicacion */
const etradasPublicacion = () => {
  return new Publicacion(
    document.getElementById("titulo"),
    document.getElementById("descripcion")
  );
};

/* creacion de publicacion */
btnCrearPublicacion.addEventListener("click", () => {
  const publicacion = etradasPublicacion();
  publicacion.abrirModal("#0004");
  publicacion.cerrarModal();
  publicacion.layendoArchivos();
  publicacion.btnPublicar();
});
