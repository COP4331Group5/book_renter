const bookData = [
    {
        name: "To Kill a Mockingbird",
        id: "1",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "Harper Lee",
        tags: ["Drama", "Southern"],
        description:
            "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
        bookType: "Fiction"
    },
    {
        name: "1984",
        id: "2",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "George Orwell",
        tags: ["Dystopian", "Political"],
        description:
            "A startling and haunting vision of the world, 1984 is so powerful that it is completely convincing from start to finish.",
        bookType: "Fiction"
    },
    {
        name: "The Great Gatsby",
        id: "3",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "F. Scott Fitzgerald",
        tags: ["Classic", "American"],
        description:
            "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island.",
        bookType: "Fiction"
    },
    {
        name: "Catcher in the Rye",
        id: "4",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "J.D. Salinger",
        tags: ["Classic", "Teen"],
        description:
            "The story of Holden Caulfield with his idiosyncrasies, penetrating insight, confusion, sensitivity and negativism.",
        bookType: "Fiction"
    },
    {
        name: "Moby Dick",
        id: "5",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "Herman Melville",
        tags: ["Adventure", "Sea"],
        description:
            "The narrative of the obsessive quest of Ahab, captain of the whaler the Pequod, for revenge on Moby Dick, the white whale.",
        bookType: "Fiction"
    },
    {
        name: "Pride and Prejudice",
        id: "6",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "Jane Austen",
        tags: ["Romance", "Classic"],
        description:
            "The story charts the emotional development of the protagonist Elizabeth Bennet, who learns the error of making hasty judgments.",
        bookType: "Fiction"
    },
    {
        name: "War and Peace",
        id: "7",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "Leo Tolstoy",
        tags: ["Historical", "Russian"],
        description:
            "A tale of strivers in a world fraught with conflict, social and political change, and spiritual confusion.",
        bookType: "Fiction"
    },
    {
        name: "The Hobbit",
        id: "8",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "J.R.R. Tolkien",
        tags: ["Fantasy", "Adventure"],
        description:
            "The story of Bilbo Baggins, a quiet and contented hobbit whose life is turned upside down when he joins the wizard Gandalf and thirteen dwarves.",
        bookType: "Fiction"
    },
    {
        name: "The Lord of the Rings",
        id: "9",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "J.R.R. Tolkien",
        tags: ["Fantasy", "Epic"],
        description:
            "The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.",
        bookType: "Fiction"
    },
    {
        name: "A Tale of Two Cities",
        id: "10",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "Charles Dickens",
        tags: ["Historical", "Classic"],
        description:
            "Set in London and Paris before and during the French Revolution, the novel tells the story of the French Doctor Manette.",
        bookType: "Fiction"
    },
    {
        name: "Sapiens: A Brief History of Humankind",
        id: "11",
        image: "https://placehold.co/400x600",
        canRent: true,
        author: "Yuval Noah Harari",
        tags: ["History", "Science"],
        description:
            "Explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human'.",
        bookType: "Nonfiction"
    },
    {
        name: "Educated",
        id: "12",
        image: "https://placehold.co/400x600",
        canRent: false,
        author: "Tara Westover",
        tags: ["Memoir", "Education"],
        description:
            "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        bookType: "Nonfiction"
    }
];

export default bookData;
