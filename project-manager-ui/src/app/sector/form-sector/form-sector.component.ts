import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Sector } from "src/app/core/models/sector.model";
import { AuthService } from "src/app/core/security/auth.service";
import { SectorService } from "../sector.service";

@Component({
  selector: 'app-form-sector',
  templateUrl: './form-sector.component.html',
  styleUrls: ['./form-sector.component.css']
})
export class FormSectorComponent implements OnInit {

  entity = new Sector();

  constructor(private sectorService: SectorService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.params['code'];
    if (code) {
      this.loadSector(code);
    }
  }

  loadSector(code: number) {
    this.sectorService.getById(code)
      .then((sector: Sector) => {
        this.entity = sector;
      })
      .catch((error: any) => this.errorHandler.handle(error));
  }

  verifyPermission(permission: string) {
    if (!this.auth.hasPermission(permission)) {
      this.messageService.add(
        {
          severity: 'error',
          summary: "Não Autorizado",
          detail: 'Você não possui permissão!'
        });
      return false;
    }
    return true
  }

  save(form: NgForm) {
    if (this.verifyPermission("ROLE_SAVE_SECTOR")) {
      if (this.isEdition()) {
        this.updateSector(form);
      } else {
        this.addSector(form);
      }
    }
  }

  async addSector(form: NgForm) {
    this.sectorService.add(this.entity)
    .then(saved => {
      if (saved) {
        this.entity.code = saved.code;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Salvo",
            detail: 'Setor gravado com sucesso!'
          });
      }
    })
    .catch((error: any) => this.errorHandler.handle(error));
  }

  updateSector(form: NgForm) {
    this.sectorService.update(this.entity)
      .then((sector: any) => {
        this.entity = sector;
        this.messageService.add(
          {
            severity: 'success',
            summary: "Atualizado",
            detail: 'Setor alterado com sucesso!'
          });
      })
    .catch((error: any) => this.errorHandler.handle(error));
  }

  isEdition(): boolean {
    return Boolean(this.entity.code);
  }

  newSector(form: NgForm) {
    form.reset(new Sector());
    this.router.navigate(['/sector/new'])
  }
}