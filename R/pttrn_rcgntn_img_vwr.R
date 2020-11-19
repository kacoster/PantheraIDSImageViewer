#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
pttrn_rcgntn_img_vwr <- function(width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    componentID = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'pttrn_rcgntn_img_vwr',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageViewer',
    elementId = elementId
  )
}

#' Shiny bindings for pttrn_rcgntn_img_vwr
#'
#' Output and render functions for using pttrn_rcgntn_img_vwr within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a pttrn_rcgntn_img_vwr
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name pttrn_rcgntn_img_vwr-shiny
#'
#' @export
pttrn_rcgntn_img_vwrOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'pttrn_rcgntn_img_vwr', width, height, package = 'PantheraIDSImageViewer')
}

#' @rdname pttrn_rcgntn_img_vwr-shiny
#' @export
renderPttrn_rcgntn_img_vwr <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, pttrn_rcgntn_img_vwrOutput, env, quoted = TRUE)
}
