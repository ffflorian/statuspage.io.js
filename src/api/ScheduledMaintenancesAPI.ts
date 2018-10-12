import {Endpoint} from '../Endpoints';
import {ScheduledMaintenance} from '../Interfaces';
import {RequestService} from '../RequestService';

/**
 * Scheduled Maintenances are planned outages, upgrades, or general notices that
 * you're working on infrastructure and disruptions may occurr. A close sibling
 * of Incidents, each usually goes through a progression of statuses listed below,
 * with an impact calculated from a blend of component statuses (or an optional
 * override).
 *
 * **Status**: *Scheduled*, *In Progress*, *Verifying*, or *Completed*
 *
 * **Impact**: *None (black)*, *Minor (yellow)*, *Major (orange)*, or *Critical (red)*
 */
export class ScheduledMaintenancesAPI {
  private readonly requestService: RequestService;

  constructor(requestService: RequestService) {
    this.requestService = requestService;
  }

  /**
   * Get a list of any active maintenances. This endpoint will only return
   * scheduled maintenances in the *In Progress* or *Verifying* state.
   */
  public getActive(): Promise<ScheduledMaintenance[]> {
    const endpoint = Endpoint.ScheduledMaintenances.upcoming();
    return this.requestService.get(endpoint);
  }

  /**
   * Get a list of the 50 most recent scheduled maintenances. This includes
   * scheduled maintenances as described in the above two endpoints, as well
   * as those in the *Completed* state.
   */
  public getAll(): Promise<ScheduledMaintenance[]> {
    const endpoint = Endpoint.ScheduledMaintenances.upcoming();
    return this.requestService.get(endpoint);
  }

  /**
   * Get a list of any upcoming maintenances. This endpoint will only return
   * scheduled maintenances still in the *Scheduled* state.
   */
  public getUpcoming(): Promise<ScheduledMaintenance[]> {
    const endpoint = Endpoint.ScheduledMaintenances.upcoming();
    return this.requestService.get(endpoint);
  }
}
