#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
ct_vldt_trggr_tbl_vldtn_9 <- function(width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    componentID = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'ct_vldt_trggr_tbl_vldtn_9',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageViewer',
    elementId = elementId
  )
}

#' Shiny bindings for ct_vldt_trggr_tbl_vldtn_9
#'
#' Output and render functions for using ct_vldt_trggr_tbl_vldtn_9 within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a ct_vldt_trggr_tbl_vldtn_9
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name ct_vldt_trggr_tbl_vldtn_9-shiny
#'
#' @export
ct_vldt_trggr_tbl_vldtn_9Output <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'ct_vldt_trggr_tbl_vldtn_9', width, height, package = 'PantheraIDSImageViewer')
}

#' @rdname ct_vldt_trggr_tbl_vldtn_9-shiny
#' @export
renderCt_vldt_trggr_tbl_vldtn_9 <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, ct_vldt_trggr_tbl_vldtn_9Output, env, quoted = TRUE)
}
