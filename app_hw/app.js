const backButton = document.querySelector("#back-button");
const editButton = document.querySelector("#edit-button");
const editableFields = [
  document.querySelector("#student-name"),
  document.querySelector("#student-number"),
];

let isEditing = false;
let originalValues = [];

backButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  }
});

function setEditing(enabled) {
  isEditing = enabled;
  editButton.setAttribute("aria-pressed", String(enabled));
  editButton.setAttribute(
    "aria-label",
    enabled ? "Lưu thay đổi hồ sơ" : "Chỉnh sửa hồ sơ",
  );

  for (const field of editableFields) {
    field.contentEditable = String(enabled);
    field.setAttribute("role", enabled ? "textbox" : "text");
    field.setAttribute(
      "aria-label",
      field.id === "student-name" ? "Họ và tên sinh viên" : "Mã số sinh viên",
    );
  }

  if (enabled) {
    originalValues = editableFields.map((field) => field.textContent);
    editableFields[0].focus();
  }
}

editButton.addEventListener("click", () => {
  setEditing(!isEditing);
});

for (const field of editableFields) {
  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setEditing(false);
    } else if (event.key === "Escape" && isEditing) {
      editableFields.forEach((editableField, index) => {
        editableField.textContent = originalValues[index];
      });
      setEditing(false);
    }
  });
}
