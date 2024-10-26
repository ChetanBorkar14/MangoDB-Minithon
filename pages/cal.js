// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
  class Navigation {
    constructor() {
      this.navbar = document.querySelector("[data-navbar]");
      this.navToggler = document.querySelector("[data-nav-toggler]");
      this.navLinks = document.querySelectorAll("[data-nav-link]");
      this.initialize();
    }

    initialize() {
      if (this.navToggler) {
        this.navToggler.addEventListener("click", () => this.toggleNavbar());
      }

      if (this.navLinks.length) {
        this.navLinks.forEach((link) => {
          link.addEventListener("click", () => this.closeNavbar());
        });
      }
    }

    toggleNavbar() {
      this.navbar?.classList.toggle("active");
    }

    closeNavbar() {
      this.navbar?.classList.remove("active");
    }
  }

  // Calendar implementation
  class Calendar {
    constructor() {
      this.currentDate = new Date();
      this.notes = this.loadNotes();
      this.initializeElements();
      this.selectedDate = null;

      if (this.areElementsAvailable) {
        this.initializeButtons();
        this.render();
      } else {
        console.error("Required calendar elements not found");
      }
    }

    get areElementsAvailable() {
      return (
        this.monthElement && this.daysElement && this.modal && this.noteText
      );
    }

    loadNotes() {
      try {
        return JSON.parse(localStorage.getItem("calendarNotes")) || {};
      } catch (error) {
        console.error("Error loading notes:", error);
        return {};
      }
    }

    initializeElements() {
      this.monthElement = document.querySelector(".month-name");
      this.daysElement = document.querySelector(".days");
      this.modal = document.getElementById("noteModal");
      this.noteText = document.getElementById("noteText");
    }

    initializeButtons() {
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");
      const cancelButton = document.querySelector(".cancel-note");
      const saveButton = document.querySelector(".save-note");

      if (prevButton) {
        prevButton.addEventListener("click", () => this.changeMonth(-1));
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => this.changeMonth(1));
      }

      if (cancelButton) {
        cancelButton.addEventListener("click", () => this.closeModal());
      }

      if (saveButton) {
        saveButton.addEventListener("click", () => this.saveNote());
      }

      // Close modal when clicking outside
      window.addEventListener("click", (event) => {
        if (event.target === this.modal) {
          this.closeModal();
        }
      });
    }

    changeMonth(delta) {
      this.currentDate.setMonth(this.currentDate.getMonth() + delta);
      this.render();
    }

    closeModal() {
      if (this.modal) {
        this.modal.style.display = "none";
      }
    }

    formatDate(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    saveNote() {
      if (!this.selectedDate || !this.noteText?.value) return;

      try {
        this.notes[this.selectedDate] = this.noteText.value;
        localStorage.setItem("calendarNotes", JSON.stringify(this.notes));
        this.closeModal();
        this.render();
      } catch (error) {
        console.error("Error saving note:", error);
        alert("Failed to save note. Please try again.");
      }
    }

    render() {
      if (!this.monthElement || !this.daysElement) return;

      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      this.updateMonthDisplay(year, month);
      this.renderDays(year, month);
    }

    updateMonthDisplay(year, month) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      this.monthElement.textContent = `${monthNames[month]} ${year}`;
    }

    renderDays(year, month) {
      this.daysElement.innerHTML = "";
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const prevMonthDays = firstDay.getDay();
      const prevMonth = new Date(year, month, 0);

      // Previous month's days
      for (let i = prevMonthDays - 1; i >= 0; i--) {
        this.createDay(
          new Date(year, month - 1, prevMonth.getDate() - i),
          true
        );
      }

      // Current month's days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        this.createDay(new Date(year, month, i), false);
      }

      // Next month's days
      const remainingDays = 42 - (prevMonthDays + lastDay.getDate());
      for (let i = 1; i <= remainingDays; i++) {
        this.createDay(new Date(year, month + 1, i), true);
      }
    }

    createDay(date, isOtherMonth) {
      const dayDiv = document.createElement("div");
      dayDiv.className = `day${isOtherMonth ? " other-month" : ""}`;

      const dateSpan = document.createElement("span");
      dateSpan.className = "date";
      dateSpan.textContent = date.getDate();
      dayDiv.appendChild(dateSpan);

      const formattedDate = this.formatDate(date);

      // Add existing note if present
      if (this.notes[formattedDate]) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note-text";
        noteDiv.textContent = this.notes[formattedDate];
        dayDiv.appendChild(noteDiv);
      }

      // Add note button
      const addButton = document.createElement("button");
      addButton.className = "add-note";
      addButton.textContent = "+";
      addButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openNoteModal(formattedDate);
      });
      dayDiv.appendChild(addButton);

      this.daysElement.appendChild(dayDiv);
    }

    openNoteModal(formattedDate) {
      if (!this.modal || !this.noteText) return;

      this.selectedDate = formattedDate;
      this.noteText.value = this.notes[formattedDate] || "";
      this.modal.style.display = "block";
    }
  }

  // Initialize both components
  try {
    new Navigation();
    new Calendar();
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});
