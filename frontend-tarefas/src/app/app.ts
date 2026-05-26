import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataBrPickerDirective } from './directives/data-br-picker.directive';
import { TarefaAtualizacaoDTO, TarefaCriacaoDTO, TarefaLeituraDTO } from './models';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, DatePipe, DataBrPickerDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly tarefaService = inject(TarefaService);
  private readonly formatoDataBr = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  protected readonly tarefas = signal<TarefaLeituraDTO[]>([]);
  protected readonly erro = signal<string | null>(null);
  protected readonly carregando = signal(true);
  protected readonly editandoId = signal<number | null>(null);
  protected readonly salvando = signal(false);
  protected readonly criando = signal(false);
  protected readonly tarefaParaExcluir = signal<TarefaLeituraDTO | null>(null);
  protected readonly excluindo = signal(false);

  protected readonly totalTarefas = computed(() => this.tarefas().length);
  protected readonly concluidas = computed(
    () => this.tarefas().filter((t) => t.concluida).length,
  );
  protected readonly pendentes = computed(
    () => this.tarefas().filter((t) => !t.concluida).length,
  );

  protected novaTitulo = '';
  protected novaDescricao = '';
  protected novaDataLimite = '';

  protected editTitulo = '';
  protected editDescricao = '';
  protected editDataLimite = '';
  protected editConcluida = false;

  ngOnInit(): void {
    this.definirDataPadraoNova();
    this.carregarTarefas();
  }

  protected carregarTarefas(): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.tarefaService.listar().subscribe({
      next: (lista) => {
        this.tarefas.set(lista);
        this.carregando.set(false);
      },
      error: (err: HttpErrorResponse) => this.tratarErro(err),
    });
  }

  protected criarTarefa(): void {
    if (!this.novaTitulo.trim() || !this.novaDataLimite) return;

    const dto: TarefaCriacaoDTO = {
      titulo: this.novaTitulo.trim(),
      descricao: this.novaDescricao.trim() || null,
      dataLimite: this.paraIsoDeBr(this.novaDataLimite),
    };

    this.criando.set(true);
    this.tarefaService.criar(dto).subscribe({
      next: () => {
        this.criando.set(false);
        this.novaTitulo = '';
        this.novaDescricao = '';
        this.definirDataPadraoNova();
        this.carregarTarefas();
      },
      error: (err: HttpErrorResponse) => {
        this.criando.set(false);
        this.tratarErro(err);
      },
    });
  }

  protected iniciarEdicao(tarefa: TarefaLeituraDTO): void {
    this.editandoId.set(tarefa.id);
    this.editTitulo = tarefa.titulo ?? '';
    this.editDescricao = tarefa.descricao ?? '';
    this.editDataLimite = this.paraExibicaoBr(tarefa.dataLimite);
    this.editConcluida = tarefa.concluida;
  }

  protected cancelarEdicao(): void {
    this.editandoId.set(null);
  }

  protected salvarEdicao(): void {
    const id = this.editandoId();
    if (id === null) return;

    const dto: TarefaAtualizacaoDTO = {
      titulo: this.editTitulo.trim() || null,
      descricao: this.editDescricao.trim() || null,
      dataLimite: this.paraIsoDeBr(this.editDataLimite),
      concluida: this.editConcluida,
    };

    this.salvando.set(true);
    this.tarefaService.atualizar(id, dto).subscribe({
      next: () => {
        this.salvando.set(false);
        this.editandoId.set(null);
        this.carregarTarefas();
      },
      error: (err: HttpErrorResponse) => {
        this.salvando.set(false);
        this.tratarErro(err);
      },
    });
  }

  protected solicitarExclusao(tarefa: TarefaLeituraDTO): void {
    this.tarefaParaExcluir.set(tarefa);
  }

  protected cancelarExclusao(): void {
    if (this.excluindo()) return;
    this.tarefaParaExcluir.set(null);
  }

  protected confirmarExclusao(): void {
    const tarefa = this.tarefaParaExcluir();
    if (!tarefa || this.excluindo()) return;

    this.excluindo.set(true);
    this.tarefaService.excluir(tarefa.id).subscribe({
      next: () => {
        this.excluindo.set(false);
        this.tarefaParaExcluir.set(null);
        if (this.editandoId() === tarefa.id) {
          this.cancelarEdicao();
        }
        this.carregarTarefas();
      },
      error: (err: HttpErrorResponse) => {
        this.excluindo.set(false);
        this.tratarErro(err);
      },
    });
  }

  protected atrasada(tarefa: TarefaLeituraDTO): boolean {
    if (tarefa.concluida) return false;
    return new Date(tarefa.dataLimite).getTime() < Date.now();
  }

  private definirDataPadraoNova(): void {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(18, 0, 0, 0);
    this.novaDataLimite = this.paraExibicaoBr(amanha.toISOString());
  }

  private paraExibicaoBr(iso: string): string {
    const data = new Date(iso);
    if (Number.isNaN(data.getTime())) return '';
    return this.formatoDataBr.format(data).replace(',', '');
  }

  private paraIsoDeBr(valor: string): string {
    const normalizado = valor.trim().replace(',', '');
    const match = normalizado.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/);

    if (match) {
      const data = new Date(
        Number(match[3]),
        Number(match[2]) - 1,
        Number(match[1]),
        Number(match[4]),
        Number(match[5]),
      );
      return Number.isNaN(data.getTime()) ? valor : data.toISOString();
    }

    const data = new Date(valor);
    return Number.isNaN(data.getTime()) ? valor : data.toISOString();
  }

  private tratarErro(err: HttpErrorResponse): void {
    this.carregando.set(false);

    if (err.status === 0) {
      this.erro.set(
        'Não foi possível conectar à API. Verifique se ela está rodando em http://localhost:5023',
      );
      return;
    }

    this.erro.set(`A API respondeu com erro ${err.status}. Tente novamente.`);
  }
}
