using AutoMapper;
using GerenciamentoDeTarefasAPI.DTOs;
using GerenciamentoDeTarefasAPI.Models;

namespace GerenciamentoDeTarefasAPI.Profiles
{
    public class TarefaProfile : Profile
    {
        public TarefaProfile()
        {
            CreateMap<Tarefa, TarefaLeituraDTO>();
            CreateMap<TarefaCriacaoDTO, Tarefa>();
            CreateMap<TarefaAtualizacaoDTO, Tarefa>();
        }
    }
}
