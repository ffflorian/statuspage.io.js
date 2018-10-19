import {Endpoint} from '../Endpoints';
import {Result} from '../Interfaces';
import {RequestService} from '../RequestService';

/**
 * Incidents are the cornerstone of any status page, being composed of many incident
 * updates. Each incident usually goes through a progression of statuses listed below,
 * with an impact calculated from a blend of component statuses (or an optional override).
 *
 * **Status**: *Investigating*, *Identified*, *Monitoring*, *Resolved*, or *Postmortem*
 *
 * **Impact**: *None (black*), *Minor (yellow*), *Major (orange*), or *Critical (red)*
 */
export class IncidentsAPI {
  private readonly requestService: RequestService;

  constructor(requestService: RequestService) {
    this.requestService = requestService;
  }

  /**
   * Get a list of the 50 most recent incidents. This includes all unresolved
   * incidents as described above, as well as those in the *Resolved* and *Postmortem* state.
   */
  public getAll(): Promise<Result.Incidents> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint);
  }

  /**
   * Get a list of any unresolved incidents. This endpoint will only return
   * incidents in the *Investigating*, *Identified*, or *Monitoring* state.
   */
  public getUnresolved(): Promise<Result.Incidents> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint);
  }
}
