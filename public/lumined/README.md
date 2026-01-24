# LuminEd - Educational Gradebook Management System

A comprehensive, production-ready gradebook management system built with ASP.NET Core 9, Razor Views, and SQLite. LuminEd provides a complete solution for educational institutions to manage students, teachers, courses, enrollments, and grades with an intuitive, role-based interface.

## Features

### Authentication & Authorization
- Role-based authentication (Admin, Teacher, Student)
- Secure cookie-based authentication with 8-hour session expiration
- Account lockout after 5 failed login attempts (15-minute lockout)
- BCrypt password hashing for secure credential storage
- CSRF protection on all forms

### Administrator Features
- **Dashboard**: Real-time statistics for students, teachers, courses, and sections
- **User Management**: Create, edit, and deactivate users with role assignment
- **Course Management**: Full CRUD operations for course catalog
- **Section Management**: Create sections with teacher and schedule assignments
- **Student Enrollment**: Enroll/unenroll students with status tracking
- **Grade Correction**: Edit student grades with complete audit trail
- **Academic Configuration**: Manage terms, school years, and student programs
- **Auto-generated IDs**: Student IDs (XX-XXXX-XXX) and Employee IDs (EMP-XXXXX)

### Teacher Features
- **Dashboard**: Overview of assigned sections
- **Assessment Creation**: Create quizzes, exams, projects, homework, and more
- **Grade Entry**: Interactive grade entry with live letter grade calculations
- **Weighted Grading**: Support for weighted grade calculations
- **Performance Overview**: View class performance and statistics
- **Report Cards**: Generate PDF report cards for students

### Student Features
- **Dashboard**: Personal overview with overall average
- **Grade Viewer**: View current grades across all enrolled courses
- **Assessment Breakdown**: Detailed view of all assessment scores
- **Progress Tracking**: Visual indicators for academic progress
- **Report Cards**: Download PDF report cards by term

### Reporting
- PDF report card generation using iTextSharp
- Preview functionality before download
- GPA calculations (4.0 scale)
- Per-term and cumulative performance metrics

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Backend** | ASP.NET Core 9.0 (C# 12) |
| **Frontend** | Razor Views, Bootstrap 5.3, jQuery 3.7 |
| **Database** | SQLite 3 with Entity Framework Core 9.0 |
| **Authentication** | Cookie-based with BCrypt hashing |
| **PDF Generation** | iTextSharp LGPLv2 |
| **Icons** | Font Awesome 6.4 |
| **UI Components** | Select2 4.1 (searchable dropdowns) |
| **Fonts** | Google Fonts (Inter) |

## Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) or later
- Visual Studio 2022 or Visual Studio Code
- Git (optional, for version control)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/LuminEd.git
cd LuminEd
```

### 2. Restore Dependencies
```bash
dotnet restore
```

### 3. Apply Database Migrations
The application uses SQLite with automatic migrations on startup, but you can manually apply them:
```bash
dotnet ef database update
```

### 4. Run the Application
```bash
dotnet run
```

The application will start at `https://localhost:5001` or `http://localhost:5000`

### Alternative: Using Visual Studio
1. Open `GradebookSystem.sln` in Visual Studio 2022
2. Press `F5` to build and run

## Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@gradebook.com | Admin@123 |

**Important**: Change this password immediately in a production environment!

## Project Structure

```
LuminEd/
├── Controllers/                 # MVC Controllers (6 total)
│   ├── AccountController.cs     # Authentication & login
│   ├── AdminController.cs       # Admin management features
│   ├── TeacherController.cs     # Teacher gradebook features
│   ├── StudentController.cs     # Student dashboard & grades
│   ├── ReportController.cs      # PDF report generation
│   └── HomeController.cs        # Home/landing page
│
├── Models/                      # Entity Models (11 total)
│   ├── User.cs                  # Multi-role user entity
│   ├── Course.cs                # Course definitions
│   ├── Term.cs                  # Academic terms/semesters
│   ├── Section.cs               # Course sections
│   ├── Enrollment.cs            # Student enrollments
│   ├── Assessment.cs            # Assessments/assignments
│   ├── Grade.cs                 # Grade records
│   ├── GradeAudit.cs            # Grade change audit trail
│   ├── StudentProgram.cs        # Academic programs
│   ├── SchoolYear.cs            # School years
│   └── PasswordResetToken.cs    # Password reset tokens
│
├── Services/                    # Business Logic Layer
│   ├── AuthService.cs           # Authentication logic
│   ├── GradeService.cs          # Grade calculations
│   ├── UserService.cs           # User management
│   ├── CourseService.cs         # Course operations
│   ├── ReportService.cs         # Report generation
│   └── EmailService.cs          # Email notifications
│
├── Data/
│   └── ApplicationDbContext.cs  # EF Core DbContext
│
├── Views/                       # Razor Views (47+ files)
│   ├── Account/                 # Login pages
│   ├── Admin/                   # Admin views (23)
│   ├── Teacher/                 # Teacher views (6)
│   ├── Student/                 # Student views (4)
│   ├── Report/                  # Report views (3)
│   ├── Home/                    # Landing page
│   └── Shared/                  # Layouts & partials
│
├── wwwroot/                     # Static Files
│   ├── css/                     # Stylesheets
│   ├── js/                      # JavaScript files
│   ├── lib/                     # Third-party libraries
│   └── images/                  # Images and assets
│
├── Migrations/                  # EF Core Migrations
├── Documentation/               # Project documentation
├── appsettings.json             # Configuration
├── Program.cs                   # Application entry point
├── GradebookSystem.csproj       # Project file
└── GradebookSystem.db           # SQLite database
```

## Database Schema

### Core Entities

| Entity | Description |
|--------|-------------|
| **Users** | All system users with role (Admin/Teacher/Student) |
| **Courses** | Course catalog with codes and descriptions |
| **Terms** | Academic terms/semesters with date ranges |
| **Sections** | Course instances with teacher assignments |
| **Enrollments** | Student-section relationships with status |
| **Assessments** | Gradable items (Quiz, Exam, Project, etc.) |
| **Grades** | Individual grade records with feedback |
| **GradeAudits** | Complete audit trail for grade changes |
| **StudentPrograms** | Academic programs (BSCE, BSCpE, etc.) |
| **SchoolYears** | Academic year definitions |

### Entity Relationships
```
Users (Teacher) ─────┬──── Sections ────┬──── Courses
                     │                  │
                     │                  └──── Terms ──── SchoolYears
                     │
Users (Student) ─────┴──── Enrollments ─┬──── Grades ──── GradeAudits
                                        │
                                        └──── Assessments
```

## API Routes

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Account/Login` | Login page |
| POST | `/Account/Login` | Process login |
| POST | `/Account/Logout` | Logout user |

### Admin Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Admin/Dashboard` | Admin dashboard |
| GET | `/Admin/Users` | User management |
| GET | `/Admin/Courses` | Course management |
| GET | `/Admin/Sections` | Section management |
| GET | `/Admin/Enrollments` | Enrollment management |
| GET | `/Admin/Terms` | Term management |
| GET | `/Admin/Programs` | Program management |

### Teacher Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Teacher/Dashboard` | Teacher dashboard |
| GET | `/Teacher/SelectAssessment` | Assessment selection |
| GET | `/Teacher/GradeEntry` | Grade entry form |
| POST | `/Teacher/SaveGrade` | Save grade |

### Student Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Student/Dashboard` | Student dashboard |
| GET | `/Student/MyGrades` | View grades |
| GET | `/Student/AssessmentBreakdown` | Assessment details |

### Report Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/Report/Preview` | Preview report card |
| GET | `/Report/Download` | Download PDF |

## Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=GradebookSystem.db"
  },
  "AppSettings": {
    "PasswordResetTokenExpiryMinutes": 30,
    "MaxLoginAttempts": 5,
    "LockoutDurationMinutes": 15
  },
  "EmailSettings": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "FromName": "LuminEd"
  }
}
```

## Security Features

- **Password Security**: BCrypt hashing with salt
- **Authentication**: Cookie-based with sliding expiration
- **Authorization**: Role-based policies (AdminOnly, TeacherOnly, StudentOnly)
- **Rate Limiting**: Account lockout after failed attempts
- **CSRF Protection**: Anti-forgery tokens on all forms
- **XSS Prevention**: Automatic Razor encoding
- **SQL Injection Prevention**: Entity Framework parameterized queries
- **Audit Trail**: Complete logging of grade changes

## Grading Scale

| Letter Grade | Percentage Range | GPA Points |
|--------------|------------------|------------|
| A+ | 97-100% | 4.0 |
| A  | 93-96%  | 4.0 |
| A- | 90-92%  | 3.7 |
| B+ | 87-89%  | 3.3 |
| B  | 83-86%  | 3.0 |
| B- | 80-82%  | 2.7 |
| C+ | 77-79%  | 2.3 |
| C  | 73-76%  | 2.0 |
| C- | 70-72%  | 1.7 |
| D+ | 67-69%  | 1.3 |
| D  | 63-66%  | 1.0 |
| D- | 60-62%  | 0.7 |
| F  | 0-59%   | 0.0 |

## Customization

### Modify Grading Scale
Edit `Services/GradeService.cs`:
```csharp
public string ConvertScoreToLetterGrade(decimal score, decimal maxScore)
{
    var percentage = (score / maxScore) * 100;
    // Customize grade thresholds here
}
```

### Configure Email Provider
Update `Services/EmailService.cs` with your email provider settings (SendGrid, AWS SES, etc.)

### Custom Styling
- Global styles: `wwwroot/css/site.css`
- Bootstrap customization: Add custom CSS or override variables

## Troubleshooting

### Database Issues
```bash
# Delete and recreate database
rm GradebookSystem.db
dotnet ef database update
```

### Login Issues
- Verify the admin user exists in the database
- Clear browser cookies and retry
- Check for account lockout (wait 15 minutes or reset in database)

### Build Errors
```bash
# Clean and rebuild
dotnet clean
dotnet restore
dotnet build
```

## Future Enhancements

- [ ] Attendance tracking module
- [ ] Parent portal access
- [ ] Email notifications system
- [ ] Advanced analytics with charts
- [ ] Bulk grade import/export (Excel)
- [ ] Mobile application
- [ ] Real-time notifications
- [ ] Assignment submission portal
- [ ] Calendar integration
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is provided for educational and commercial purposes.

## Support

For issues, questions, or contributions, please create an issue in the repository.

## Acknowledgments

- Built with [ASP.NET Core 9](https://dotnet.microsoft.com/apps/aspnet)
- UI powered by [Bootstrap 5](https://getbootstrap.com/)
- Icons by [Font Awesome](https://fontawesome.com/)
- PDF generation with [iTextSharp](https://github.com/itext/itextsharp)
- Database with [SQLite](https://www.sqlite.org/) & [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

---

**Version**: 2.1.0
**Last Updated**: January 2026
**Platform**: .NET 9.0 | SQLite | Bootstrap 5.3
