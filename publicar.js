const fragment = document.createDocumentFragment();
const btnPublicar = document.getElementById("btnPublicar");

btnPublicar.addEventListener("click", () => {
  console.log("funci");
});

const modal = (file, title, description) => {
  const archivo = document.createElement("input");
  archivo.type = "file";
  const titulo = document.createElement("input");
  titulo.placeholder = "Título";
  const descripcion = document.createElement("input");
  descripcion.placeholder = "Descripción";
  fragment.appendChild(archivo);
  fragment.appendChild(titulo);
  fragment.appendChild(descripcion);
  document.querySelector(".root").appendChild(fragment);
};

modal();
