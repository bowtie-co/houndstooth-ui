
/**
 * Ecosystems should semantically represent the major core components and ideas
 * the interface is trying to communicate, which, typically, correlate to visual space.
 * Ecosystems can be nested.
 *
 * Nested ecosystems should never be conceptually independent from the parent ecosystem,
 * and when communicating, a nested ecosystem should never directly communicate to another
 * nested ecosystem— Let the parents do the talking.
 */

import Repo from './Repo'
import Collections from './Collections'
import Data from './Data'
import Users from './Users'
import FileTree from './FileTree'
import Notifications from './Notifications'
import ErrorBoundary from './ErrorBoundary'

export {
  Repo,
  Collections,
  Data,
  FileTree,
  Users,
  Notifications,
  ErrorBoundary
}
