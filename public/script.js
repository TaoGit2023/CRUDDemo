document.addEventListener("DOMContentLoaded", () => {
  const addCourseForm = document.getElementById("add-course-from");
  const courseList = document.getElementById("course-list");
  const errorContainer = document.getElementById("error_container");

  const fetchData = async () => {
    try {
      const url = "http://localhost:8000/api/courses";
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      courseList.innerHTML = "";
      data.map((item) => {
        const li = document.createElement("li");
        li.textContent = `Title:${item.title}, Instructor:${item.instructor}, Duration:${item.duration}`;
        //create a delete button
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-button");
        deleteBtn.dataset.courseId = item._id;
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-button");
        editBtn.dataset.courseId = item._id;
        li.append(deleteBtn);
        li.append(editBtn);
        courseList.append(li);
      });
    } catch (error) {
      console.log("error fetching courses", error);
    }
  };
  addCourseForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addCourseForm);
    const courseData = Object.fromEntries(formData);
    console.log(courseData);
    try {
      const url = "http://localhost:8000/api/courses";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        addCourseForm.reset();
        fetchData();
      }
      const responseData = await response.json();
      if (responseData.errors) {
        errorContainer.innerHTML = "";
        for (const field in responseData.errors) {
          const errorText = responseData.errors[field];
          const errorElement = document.createElement("p");
          errorElement.textContent = errorText;
          errorContainer.appendChild(errorElement);
        }
      }
    } catch (error) {
      console.error("Error adding course", response.statusText);
    }
  });
  courseList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
      const courseId = event.target.dataset.courseId;
      if (confirm("are you sure you want to delete this course?")) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/courses/${courseId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            fetchData();
          } else {
            console.error("Error deleting course:", response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    if (event.target.classList.contains("edit-button")) {
      const courseId = event.target.dataset.courseId;
      const editFrom = document.createElement("form");
      const titleInput = document.createElement("input");
      titleInput.name = "title";
      const instructorInput = document.createElement("input");
      instructorInput.name = "instructor";
      const durationInput = document.createElement("input");
      durationInput.name = "duration";
      durationInput.placeholder = "duration";
      const descriptionInput = document.createElement("input");
      descriptionInput.name = "description";
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.type = "submit";
      saveBtn.classList.add("save-button");
      editFrom.appendChild(titleInput);
      editFrom.appendChild(instructorInput);
      editFrom.appendChild(descriptionInput);
      editFrom.appendChild(durationInput);
      editFrom.appendChild(saveBtn);
      courseList.appendChild(editFrom);
      try {
        editFrom.addEventListener("submit", async (event) => {
          event.preventDefault();
          const formData = new FormData(editFrom);
          const courseData = Object.fromEntries(formData);
          console.log(courseData);
          const response = await fetch(
            `http://localhost:8000/api/courses/${courseId}`,
            {
              method: "PUT",
              body: JSON.stringify(courseData),
            }
          );
          if (response.ok) {
            fetchData();
          } else {
            console.error("error");
          }
        });
      } catch (error) {}
    }
  });
  fetchData();
});
