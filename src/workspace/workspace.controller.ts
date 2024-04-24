import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './entity/workspace.entity';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}


  @Post("create-workspace")
  async createWorkspace(@Body()workspace:WorkspaceDto):Promise<Workspace>{
    return await this.workspaceService.createWorkspace(workspace)
  }
  @Get("find-workspace-by-id/:workspaceId")
  async findWorkspaceById(@Param("workspaceId") workspaceId:number):Promise<Workspace>{
    return await this.workspaceService.findWorkspaceById(workspaceId)
  }
}
