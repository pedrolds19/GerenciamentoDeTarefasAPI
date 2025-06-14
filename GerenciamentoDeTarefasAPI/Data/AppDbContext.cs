﻿using GerenciamentoDeTarefasAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenciamentoDeTarefasAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Tarefa> Tarefas => Set<Tarefa>();
    }
}
