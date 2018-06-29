
/**
 * Ecosystems should semantically represent the major core components and ideas
 * the interface is trying to communicate, which, typically, correlate to visual space.
 * Ecosystems can be nested.
 *
 * Nested ecosystems should never be conceptually independent from the parent ecosystem,
 * and when communicating, a nested ecosystem should never directly communicate to another
 * nested ecosystem— Let the parents do the talking.
 */

import Description from './Description'
import Main from './Main'
import Repo from './Repo'

export { Description, Main, Repo }
