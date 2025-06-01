using GerenciamentoDeTarefasAPI.DTOs;
using GerenciamentoDeTarefasAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDeTarefasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaServico _servico;

        public TarefasController(ITarefaServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarefaLeituraDTO>>> Listar()
        {
            var tarefas = await _servico.ListarAsync();
            return Ok(tarefas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TarefaLeituraDTO>> BuscarPorId(int id)
        {
            var tarefa = await _servico.BuscarPorIdAsync(id);
            if (tarefa == null) return NotFound();
            return Ok(tarefa);
        }

        [HttpPost]
        public async Task<ActionResult<TarefaLeituraDTO>> Criar(TarefaCriacaoDTO dto)
        {
            var nova = await _servico.CriarAsync(dto);
            return CreatedAtAction(nameof(BuscarPorId), new { id = nova.Id }, nova);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, TarefaAtualizacaoDTO dto)
        {
            var sucesso = await _servico.AtualizarAsync(id, dto);
            return sucesso ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(int id)
        {
            var sucesso = await _servico.RemoverAsync(id);
            return sucesso ? NoContent() : NotFound();
        }
    }
}
